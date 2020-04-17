public abstract class Pizza{
   
   String name;
   
   Dough dough;
  /* Sauce sauce;
   Veggies veggies[];
   Cheese cheese;
   Pepperoni pepperoni;
   Clams clam;*/
   
   abstract void prepare(); //we now made prepare method abstract (collect ingredients for pizza)
   
   void bake(){
      System.out.println("Bake for 25 minutes at 350.");
   }
   void cut(){
      System.out.println("Cutting pizza into slices");
   }
   void box(){
      System.out.println("Place pizza in box.");
   }
   
   void setName(String name){
      this.name = name;
   }
   
   String getName(){
      return this.name;
   }
   
   public String toString(){
      //code to print pizza goes here
   }
}
   