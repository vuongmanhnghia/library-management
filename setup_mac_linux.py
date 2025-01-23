import os
import subprocess
import time

# === Kiểm tra Python và Node.js đã cài chưa ===
def check_installed(command, name):
    try:
        subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
        print(f"✅ {name} đã được cài đặt.")
    except subprocess.CalledProcessError:
        print(f"❌ {name} chưa được cài đặt. Vui lòng cài đặt trước khi chạy script.")
        exit(1)

check_installed(["python3", "--version"], "Python")
check_installed(["node", "--version"], "Node.js")

# === Nhập thông tin từ người dùng ===
MONGO_URL = input("Nhập đường dẫn MongoDB: ")
SECRET_KEY = input("Nhập Secret Key: ")
print("⚠️ HOST không để dấu '/' ở cuối. ⚠️")
HOST_API = input("Nhập API host: ")
HOST_LOCAL = input("Nhập địa chỉ local cho frontend: ")

# Lấy thư mục gốc của dự án
PROJECT_DIR = os.getcwd()

# === Setup Frontend ===
FRONTEND_DIR = os.path.join(PROJECT_DIR, "libary")
if not os.path.exists(FRONTEND_DIR):
    print("❌ Thư mục 'libary' không tồn tại!")
    exit(1)

env_frontend_path = os.path.join(FRONTEND_DIR, ".env")
with open(env_frontend_path, "w") as f:
    f.write(f"REACT_APP_API_URL={HOST_API}\n")
    f.write(f"PUBLIC_URL={HOST_LOCAL}\n")

print("📝 Đã tạo .env cho frontend.")

# Chạy terminal riêng cho frontend
subprocess.Popen(["osascript", "-e", f'tell application "Terminal" to do script "cd {FRONTEND_DIR} && npm install && npm start"'])

time.sleep(1)  # Đợi để tránh xung đột

# === Setup Backend ===
BACKEND_DIR = os.path.join(PROJECT_DIR, "fastAPI")
if not os.path.exists(BACKEND_DIR):
    print("❌ Thư mục 'fastAPI' không tồn tại!")
    exit(1)

# Tạo môi trường ảo
venv_path = os.path.join(BACKEND_DIR, "venv")
subprocess.run(["python3", "-m", "venv", venv_path], check=True)
print("📌 Đã tạo môi trường ảo cho backend.")

# Tạo file .env cho backend
env_backend_path = os.path.join(BACKEND_DIR, ".env")
with open(env_backend_path, "w") as f:
    f.write(f"MONGO_URL={MONGO_URL}\n")
    f.write(f"SECRET_KEY={SECRET_KEY}\n")

print("📝 Đã tạo .env cho backend.")

# Chạy terminal riêng cho backend
subprocess.Popen(["osascript", "-e", f'tell application "Terminal" to do script "cd {BACKEND_DIR} && source venv/bin/activate && pip install -r requirements.txt && pip uninstall -y motor pymongo && pip install -y motor pymongo && uvicorn app.main:app --reload"'])

print("✅ Hai terminal đã mở. Kiểm tra cửa sổ terminal!")
