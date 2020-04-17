public class RemoteControlTest{ //client
   public static void main(String[] args){   
      SimpleRemoteControl remote = new SimpleRemoteControl(); //invoker
      Light light = new Light(); //receiver
      LightOnCommand lightOn = new LightOnCommand(light); //create a command, pass receiver to it.
      
      remote.setCommand(lightOn); //client passes command to the invoker
      remote.buttonWasPressed(); //result given to us via invoker
   }
}