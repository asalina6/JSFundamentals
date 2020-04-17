public class ChoclateBoilerSingleton{
   
   private static ChocolateBoilerInstance;
   private boolean empty;
   private boolean boiled;
   
   private ChoclateBoilerSingleton(){
      empty = true;
      boiled = false;
   }
   
   public static ChoclateBoilerSingleton getInstance(){
      if(ChocolateBoilerInstance == null){
         ChocolateBoilerInstance = new ChoclateBoilerSingleton();
      }
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