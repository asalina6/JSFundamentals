public class SingletonEager
   
   private static SingletonEager UniqueInstance = new Singleton(); //eager instantiation
   
   private SingletonEager(){} //private default constructor
   
   public static  SingletonEager getInstance(){ 
      return uniqueInstance;
  }
}
//Solution #1 to not use synchronized: Eager Instantiation
//JVM gurantees that instance will be created before any thread accesses the static uniqueInstance variable