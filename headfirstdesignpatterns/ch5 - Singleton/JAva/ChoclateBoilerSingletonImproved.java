public class ChoclateBoilerSingletonImproved{
   
   private static ChoclateBoilerSingletonImproved ChocolateBoilerInstance;
   private boolean empty;
   private boolean boiled;
   
   private ChoclateBoilerSingletonImproved(){
      empty = true;
      boiled = false;
   }
   
   public static synchronized ChoclateBoilerSingletonImproved getInstance(){
      if(ChocolateBoilerInstance == null){
         ChocolateBoilerInstance = new ChoclateBoilerSingletonImproved();
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