public class Light{

   boolean isOn;
   
   public Light(){
      isOn = false;
   }
   
   public void on(){
      isOn = true;
      System.out.println("Light is on");
   }
   
   public void off(){
      isOn = false;
      System.out.println("Light is off");
   }
}