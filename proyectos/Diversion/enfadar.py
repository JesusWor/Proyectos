import pyautogui
import webbrowser
from time import sleep

webbrowser.open('https://web.whatsapp.com/send?phone=+5213318506241')
a = ['Hola', 'mi', 'nombre', 'es', 'Juan', 'y', 'vengo', 'a', 'enfadarte', 'jajaja', 'saludos', 'buen', 'día']
b = ['Hola', 'mi', 'nombre', 'es', 'frailejon', 'Ernesto', 'Perez', 'no', 'me', 'conoces', 'pero', 'yo', 'a', 'ti', 'si', 'si']
c = 'Me das comida?'
sleep(5)
for i in range(3):
    for word in b:
        pyautogui.typewrite(word)
        pyautogui.press('enter')
        sleep(1)