public class TurkeyAdapter implements Duck{  //implement what you're adapting to
   Turkey turkey;
   
   public TurkeyAdapter(Turkey turkey){
      this.turkey = turkey;
   }
   
   public void quack(){ 
      turkey.gobble();
   }
   
   public void fly(){
      //to make up for short flying distance, call 3 times
      for(int i=0;i<3;i++){
         turkey.fly();
      }
   }
}