#!/bin/bash

# Start Celery worker
celery -A api.index.celery worker --loglevel=info --concurrency=2 &