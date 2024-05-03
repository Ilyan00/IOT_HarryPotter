import network
import urequests
import utime
import ujson
from machine import Pin, PWM

wlan = network.WLAN(network.STA_IF) 
wlan.active(True) 

ssid = 'iPhone Ilyan'
password = 'ilyanjude'
wlan.connect(ssid, password)
url = "http://172.20.10.2:3000/lastHouse"


max = 35000

def defined_couleur(val):
    if val <= 0 :
        return 0
    else :
        return int(val * (max / 255))
    
def creationPin(pinUsed):
    return PWM(Pin(pinUsed,mode=Pin.OUT))
    

couleur_house={
    "Gryffindor" : [255,0,0],
    "Slytherin" : [0,255,0],
    "Hufflepuff" : [255,255,0],
    "Ravenclaw" : [0,0,255],
    "no-house" : [255,255,255],
    "" : [0,0,0]
    }

while not wlan.isconnected():
    print("pas co")
    utime.sleep(1)
    pass

pin = [0,1,2]
    
pwm_led_r = creationPin(pin[0])
pwm_led_r.freq(1_000)

pwm_led_v = creationPin(pin[1])
pwm_led_v.freq(1_000)

pwm_led_b = creationPin(pin[2])
pwm_led_b.freq(1_000)

while(True):
    try:
        print("get")
        r = urequests.get(url)
        
        couleur = couleur_house[r.json()["message"]]
        print(r.json()["message"])
        r.close()
        
        
        print("perso recu")
        rouge = defined_couleur(couleur[0])
        vert = defined_couleur(couleur[1])
        bleu = defined_couleur(couleur[2])

        pwm_led_r.duty_u16(rouge)
        pwm_led_v.duty_u16(vert)
        pwm_led_b.duty_u16(bleu)
        
        utime.sleep(1)  
    except Exception as e:
        print(e)
    
