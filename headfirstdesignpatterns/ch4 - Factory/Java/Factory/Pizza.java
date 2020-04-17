import java.util.*;

public abstract class Pizza{
   String name;
   String dough;
   String sauce;
   ArrayList<String> toppings = new ArrayList<String>();
   
   void prepare(){
      System.out.println("Preparing " + name);
      System.out.println("Tossing dough...");
      System.out.println("Adding sauce...");
      System.out.println("Adding additional toppings: ");
      for(String topping: toppings){
         System.out.println(" " + topping);
      }
   }
   
   void bake(){
      System.out.println("Bake for 25 minutes at 350.");
   }
   void cut(){
      System.out.println("Cutting pizza into slices");
   }
   void box(){
      System.out.println("Place pizza in box.");
   }
   public String getName(){
      return name;
   }
}