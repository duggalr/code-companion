import os
import docker
from celery import Celery


# Initialize Celery
celery = Celery('worker', broker='redis://localhost:6379/0')

# Initialize Docker client
client = docker.from_env()

@celery.task
def execute_code_in_container(language: str, code: str):
    """
    Task to run user-submitted code inside a Docker container.
    """
    # Set up language-specific Docker image
    docker_image = {
        "python": "python:3.12-slim",
        "nodejs": "node:14-slim"
    }.get(language)

    if not docker_image:
        raise ValueError("Unsupported language")

    # Write the user's code to a temporary file
    host_code_dir = "/tmp"  # Directory on the host
    code_file_name = "submission_code.py"  # Name of the file
    host_code_file = os.path.join(host_code_dir, code_file_name)

    with open(host_code_file, "w") as f:
        f.write(code)

    # The code will be placed in the /app directory inside the container
    container_code_file = f"/app/{code_file_name}"

    # Create the command to run inside the container
    exec_cmd = {
        "python": f"python {container_code_file}",
        "nodejs": f"node {container_code_file}"
    }.get(language)

    # Initialize Docker client
    client = docker.from_env()

    # Run the code inside a Docker container
    container = client.containers.run(
        image=docker_image,
        command=exec_cmd,
        volumes={host_code_dir: {"bind": "/app", "mode": "rw"}},  # Mount the entire /tmp directory
        working_dir="/app",
        detach=True,
        mem_limit="512m",
        cpu_period=100000,
        cpu_quota=50000  # limits CPU to 50% of a single CPU core
    )

    # Wait for the container to complete
    result = container.wait()

    # Capture the container logs (output from the code execution)
    logs = container.logs().decode("utf-8")

    # # Remove the container explicitly
    container.remove()

    if result["StatusCode"] == 0:
        return {"success": True, "output": logs}
    else:
        return {"success": False, "output": logs}


# if __name__ == "__main__":
#     user_code = """
# def greet(name: str) -> str:
#     return f"Hello, {name}!"

# if __name__ == "__main__":
#     print(greet("Rahul"))
# """
#     # Test execution
#     response = execute_code_in_container(language="python", code=user_code)
#     print(response)
