/*Full home automation system with Nodemcu and Blynk
 * https://srituhobby.com
 */
#define BLYNK_TEMPLATE_ID "TMPL3MoFMWULh"
#define BLYNK_TEMPLATE_NAME "gas sensor"
#define BLYNK_AUTH_TOKEN "S34fd5gs5zZoF8KPsXkVOu7ibBZINkuq"
 
#include <LiquidCrystal_I2C.h>
#define BLYNK_PRINT Serial
#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>
#include <DHT.h>


char auth[] = BLYNK_AUTH_TOKEN;

char ssid[] = "iQOO Neo7";  // type your wifi name
char pass[] = "18052003"; //Enter your WIFI password

LiquidCrystal_I2C lcd(0x27, 16, 2);
DHT dht(D4, DHT11); //(sensor pin,sensor type)
BlynkTimer timer;
bool pirbutton = 0;

#define Buzzer 10
#define MQ2 A0
#define flame D0
#define PIR D3
#define trig D5
#define echo D6
#define relay1 D7
#define relay2 D8

BLYNK_WRITE(V3) {
  pirbutton = param.asInt();
}

void setup() {
  Serial.begin(9600);
  lcd.init();
  lcd.backlight();
  pinMode(Buzzer, OUTPUT);
  pinMode(D0, INPUT);
  pinMode(PIR, INPUT);
  pinMode(trig, OUTPUT);
  pinMode(echo, INPUT);
  pinMode(relay1, OUTPUT);
  pinMode(relay2, OUTPUT);
  digitalWrite(relay1, HIGH);
  digitalWrite(relay2, HIGH);
  Blynk.begin(auth, ssid, pass);
  dht.begin();
  timer.setInterval(100L, gassensor);
  timer.setInterval(100L, DHT11sensor);
  timer.setInterval(100L, flamesensor);
  timer.setInterval(100L, pirsensor);
//  timer.setInterval(200L, ultrasonic);
}

void gassensor() {
  int value = analogRead(MQ2);
  Serial.println(value);
  value = map(value, 0, 1024, 0, 100);
  if (value <= 35) {
    digitalWrite(Buzzer, LOW);
  } else if (value > 35) {
    Blynk.logEvent("gas_alert","Gas Leakage Detected at block A and safe area to exit is block B and to enter is C");
    digitalWrite(Buzzer, HIGH);
  }
  Blynk.virtualWrite(V0, value);
  lcd.setCursor(9, 0);
  lcd.print("G :");
  lcd.print(value);
  lcd.print("  ");
}

void DHT11sensor() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  Blynk.virtualWrite(V1, t);
  Blynk.virtualWrite(V2, h);

  lcd.setCursor(0, 0);
  lcd.print("T :");
  lcd.print(t);

  lcd.setCursor(0, 1);
  lcd.print("H :");
  lcd.print(h);
}

void flamesensor() {
  bool value = digitalRead(flame );
  if (value == 1) {
    digitalWrite(Buzzer, LOW);
  } else if (value == 0) {
    Blynk.logEvent("fire_alert","Fire Detected at block A and safe area to exit is block B and to enter is C");
    digitalWrite(Buzzer, HIGH);
  }
}
void pirsensor() {
  bool value = digitalRead(PIR);
  if (pirbutton == 1) {
    if (value == 0) {
      digitalWrite(Buzzer, LOW);
    } else if (value == 1) {
      Blynk.logEvent("Warning! Please check your security system");
      digitalWrite(Buzzer, HIGH);
    }
  }
}




void loop() {
  Blynk.run();
  timer.run();
}
