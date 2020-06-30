#récup la request
import requests
import json

class giveMeYourArray:
    horraires = []
    quantity = 0
    response = requests.get('https://calm-ravine-68746.herokuapp.com/regime?id_gamelle=1')
    if(response.status_code == 200):
        frequence = response.json()['result'][0]['frequence']
        grammage = response.json()['result'][0]['dose']

    else:
        frequence = 24
        grammage = 100

    print(frequence)
    def getConf():
        quantity = (giveMeYourArray.grammage/giveMeYourArray.frequence)
        count = 1
        while(count <= giveMeYourArray.frequence):
            time = round((24/giveMeYourArray.frequence)*count)
            giveMeYourArray.horraires.append(time)
            count += 1







