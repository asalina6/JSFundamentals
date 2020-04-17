public class RemoteControl{   

   Command[] onCommands;
   Command[] offCommands;
   final int NUM_OF_SLOTS = 7;
   
   public RemoteControl(){ 
      onCommands = new Command[NUM_OF_SLOTS];
      offCommands = new Command[NUM_OF_SLOTS];
      
      Command noCommand = new noCommand();
      for(int i=0; i < onCommands.length; i++){
         onCommands[i] = noCommand;
         offCommands[i] = noCommand;
      }
   }
   
   public void setCommand(int slot, Command onCommand, Command offCommand){   
      onCommands[slot] = onCommand;
      offCommands[slot] = offCommand;
   }
   
   public void onButtonWasPushed(int slot){
      onCommands[slot].execute();
   }
   
   public void offButtonWasPushed(int slot){
      offCommands[slot].execute();
   }
   
   public String toString(){  
      StringBuffer stringBuff = new StringBuffer();
      stringBuff.append("\n------ Remote Contorl ------ \n");
      for(int i = 0; i < onCommands.lenght;i++){
         stringBuff.append("[slot " + i + "] " + onCommands[i].getClass().getName() + " " + offCommands[i].getClass.getName() + "\n");
      }
      return stringBuff.toString();
   }
}
   
   