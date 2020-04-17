public class Singleton{
   
   private static Singleton UniqueInstance;
   
   private Singleton(){} //private default constructor
   
   public static Singleton getInstance(){
      if(uniqueInstance == null){
         uniqueInstance = new Singleton(); //lazy instantiation
      }
      
      return uniqueInstance;
  }
}

//This code will have some problems with multithreading