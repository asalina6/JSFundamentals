public class SingletonImproved
   
   private static SingletonImproved UniqueInstance;
   
   private SingletonImproved(){} //private default constructor
   
   public static synchronized SingletonImproved getInstance(){  //added synchronized
      if(uniqueInstance == null){
         uniqueInstance = new SingletonImproved(); //lazy instantiation
      }
      
      return uniqueInstance;
  }
}

//Synchronized gives a huge overhead (only necessary for the first time accessed, afterwards its a waste).