import os
import docker
from celery import Celery


# # Initialize Celery
# celery = Celery(
#     'worker',
#     broker='redis://localhost:6379/0',
#     backend='redis://',
# )
# celery = Celery(__name__)
# celery.conf.broker_url = os.environ.get("CELERY_BROKER_URL", "redis://localhost:6379/0")
# celery.conf.result_backend = os.environ.get("CELERY_RESULT_BACKEND", "redis://localhost:6379")

# Initialize Celery
celery = Celery(__name__)
celery.conf.update(
    broker_url = os.environ.get("CELERY_BROKER_URL", "redis://localhost:6379/0"),
    result_backend = os.environ.get("CELERY_RESULT_BACKEND", "redis://localhost:6379/0"),
)

print(f"Celery CONFIG: {celery.conf}")

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



# import random
# import time

# @celery.task(name="test_task_one")
# def test_task_one():
#     rv = []
#     for idx in range(0, 8):
#         rn = random.choice(list(range(1,4)))
#         print(f"Sleep for {rn} seconds...")
#         time.sleep(rn)
#         rv.append(idx)
    
#     final_sum = sum(rv)
#     return {'success': True, 'output': final_sum}


# # TODO: let existing tasks finish and proceed from there to testing again once and then, adding our execute_code task

# @celery.task
# def add(x, y):
#     return x + y

