public class SingletonLocking{
   
   private volatile static SingletonLocking UniqueInstance; //added volatile
   
   private SingletonLocking(){} //private default constructor
   
   public static SingletonLocking getInstance(){
      
         synchronized (SingletonLocking.class){ //used sychonized block
            if(uniqueInstance == null){
               uniqueInstance = new SingletonLocking(); //lazy instantiation
            }
         } 
    
         return uniqueInstance;     
   }
}

//This code will reduce the overhead. THIS DOES NOT WORK IN JAVA 1.4 or earlier (so don't use this for earlier than Java 5)