public class DuckTestDrive{
   public static void main(String[] args){
      WildTurkey turkey = new WildTurkey();
      Duck turkeyAdapter = new TurkeyAdapter(turkey);
      
      testDuck(turkeyAdapter);
      }
      
      static void testDuck(Duck duck){
         duck.quack();
         duck.fly();
      }
}