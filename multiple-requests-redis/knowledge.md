# The inventory has only 1 item left, but multiple USERS are purchasing at the same time

## Setup

install express redis
install apache benchmark to test multiple concurrent requests
bash: ab -n 10 -c 5 http://localhost:3000/order
-n 10: 10 total 10 requests perform
-c 5: 5 requests to make at a time
