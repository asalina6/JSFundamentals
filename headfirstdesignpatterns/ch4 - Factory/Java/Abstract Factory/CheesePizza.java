public class CheesePizza extends Pizza{
   
   PizzaIngredientFactory ingredientFactory //stored as instance variable, loose coupling, depdency inversion
   
   public CheesePizza(PIzzaIngredientFactory ingredientFactory){
      this.ingredientFactory = ingredientFactory;
   }
   
   void prepare(){
      System.out.println("Preparing " + name);
      dough = ingredientFactory.createDough();
      //sauce = ingredientFactory.createSauce();
      //cheese = ingredientFactory.createCheese();
   }
}