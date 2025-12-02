import threading
import pyautogui
import time
import random

key_lock = threading.Lock()
priority_lock = threading.Lock()
seven_pressed = [True]  # 7번 키가 눌렸는지 상태, 항상 True로 유지

def thread12():
    time.sleep(182)  # 첫 실행은 초기 1→2→3 이후부터
    while True:
        with priority_lock:
            with key_lock:
                # 1번 동작: 6→8→7
                pyautogui.keyDown('7')
                pyautogui.keyUp('7')
                time.sleep(0.2)
                pyautogui.keyDown('8')
                pyautogui.keyUp('8')
                time.sleep(0.7)
                seven_pressed[0] = True

                # 2번 동작: 6→z→z→z→7
                pyautogui.keyDown('6')
                pyautogui.keyUp('6')
                time.sleep(0.4)
                for _ in range(3):
                    pyautogui.keyDown('z')
                    pyautogui.keyUp('z')
                    time.sleep(0.4)
                time.sleep(0.3)
                pyautogui.keyDown('7')
                pyautogui.keyUp('7')
                seven_pressed[0] = True
        time.sleep(182)  # 1,2번 묶음 반복 주기(원하는 주기로 조정)

def thread3():
    time.sleep(random.uniform(5, 6))  # 첫 실행은 초기 1→2→3 이후부터
    while True:
        with priority_lock:
            with key_lock:
                pyautogui.keyDown('z')
                pyautogui.keyUp('z')
        time.sleep(random.uniform(5, 6))

if __name__ == "__main__":
    # 프로그램 시작 시 thread12의 반복 구조처럼 1,2번 동작만 합쳐서 실행
    with priority_lock:
        with key_lock:
            # 1번 동작: 7→8→7
            pyautogui.keyDown('7')
            pyautogui.keyUp('7')
            time.sleep(0.2)
            pyautogui.keyDown('8')
            pyautogui.keyUp('8')
            time.sleep(0.7)
        
            pyautogui.keyDown('6')
            pyautogui.keyUp('6')
            time.sleep(0.4)
            for _ in range(3):
                pyautogui.keyDown('z')
                pyautogui.keyUp('z')
                time.sleep(0.4)
            time.sleep(0.3)
            pyautogui.keyDown('7')
            pyautogui.keyUp('7')
            seven_pressed[0] = True
    time.sleep(0.6)
    with priority_lock:
        with key_lock:
            # 3번 동작
            pyautogui.keyDown('z')
            pyautogui.keyUp('z')
    # 각 스레드 주기적 반복 시작(초기 실행 이후)
    t12 = threading.Thread(target=thread12, daemon=True)
    t3 = threading.Thread(target=thread3, daemon=True)
    t12.start()
    t3.start()
    while True:
        time.sleep(1)
