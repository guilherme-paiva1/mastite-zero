// Define constante pra entrada de dados
const int PINO_SENSOR_UMIDADE_SOLO = A0;

// Configura sensor para uso
void setup() {
  Serial.begin(9600);
  pinMode(PINO_SENSOR_UMIDADE_SOLO, INPUT);
}

// Código principal, que se repete
void loop() {
  
  // Captura a leitura do sensor e armazena em variável
  int leituraSensor = analogRead(PINO_SENSOR_UMIDADE_SOLO);
  
  // Lógica para conversão da leitura para porcentagem
  // 1023 = seco, 1 = úmido
  // Para encontrarmos a leitura de umidade e nao quao seco, inverte a porcentagem
  float porcentagemUmidade =  (1 - (leituraSensor / 1023.0)) * 100;

  // Cria gráfico com dados e limite para usuário
  Serial.print ("0:");
  Serial.print (0);
  Serial.print (" ");
  Serial.print ("UmiMínima:");
  Serial.print (30);
  Serial.print (" ");
  Serial.print ("Umidade:");
  Serial.print (porcentagemUmidade);
  Serial.print (" ");
  Serial.print ("UmiMáxima:");
  Serial.println (45);
  

  // Define de quanto em quanto tempo a função se repetirá
  delay(1000);
}




  
