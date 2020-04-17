public class ChoclateBoilerSingletonEager{
   
   private static ChocolateBoilerInstance = new ChoclateBoilerSingletonEager();
   private boolean empty;
   private boolean boiled;
   
   private ChoclateBoilerSingletonEager(){
      empty = true;
      boiled = false;
   }
   
   public static ChoclateBoilerSingletonEager getInstance(){
      return ChocolateBoilerInstance;
   }
   
   public void fill(){
      if(isEmpty()){
         empty = false;
         boiled = false;
      }
   }
   
   public void drain(){
      if(!isEmpty() && isBoiled()){
         empty = true;
      }
   }
   
   public void boil(){
      if(!isEmpty() && !isBoiled()){
         boiled = true;
      }
   }
   
   public boolean isEmpty(){
      return empty;
   }
   
   public boolean isBoiled(){
      return boiled;
   }
}