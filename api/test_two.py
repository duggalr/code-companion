from celery.result import AsyncResult
from worker import test_task_one


def run_task():
    task = test_task_one.delay()
    return {"task_id": task.id}


def check_task_result(task_id_val):
    task_result = AsyncResult(task_id_val)
    return task_result


# task_id_dict = run_task()
# print(f"Task Dict: {task_id_dict}")

# task_id_val = task_id_dict['task_id']
# task_id_val = "f3c87c5d-c77d-4478-a788-06d2399481f7"
task_id_val = "b5916a11-fdde-414f-9b99-8421317701af"
task_result = check_task_result(task_id_val)
print(f"Task Result: {task_result} | {task_result is None }")

while task_result is None:
    task_result = check_task_result(task_id_val)    

print(f"Complete Task State: {task_result}")
print(f"Complete Task State: {task_result.get()}")


# if task_result.state != "SUCCESS":
#     check_task_result(task_id_val)
# else:
#     print({"status": "Task completed", "output": task_result.result})
