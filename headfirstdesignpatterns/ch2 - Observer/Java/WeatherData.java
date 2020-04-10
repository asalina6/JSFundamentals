import java.util.*;
public class WeatherData implements Subject{
   private ArrayList<Observer> observers;
   private float temperature;
   private float humidity;
   private float pressure;
   
   public WeatherData(){
      observers = new ArrayList<Observer>();
   }
   
   public void registerObserver(Observer obs){
      observers.add(obs);
   }
   
   public void removeObserver(Observer obs){
      int i = observers.indexOf(obs);   
      if(i>=0){
         observers.remove(i);
      }else{
         System.out.println("Can't find such observer");
      }
   }
   
   public void notifyObservers(){
      for(Observer observer : observers){
         observer.update(temperature,humidity,pressure);
      }
   }
   
   public void measurementsChanged(){
      notifyObservers();
   }
   
   public void setMeasurements(float temperature, float humidity, float pressure){
      this.temperature = temperature;
      this.humidity = humidity;
      this.pressure = pressure;
      measurementsChanged();
   }
   
   //other weatherdata methods here
   
}