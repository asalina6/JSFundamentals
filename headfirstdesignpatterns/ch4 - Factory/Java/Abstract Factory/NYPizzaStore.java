public class NYPizzaStore extends PizzaStore{
   
   Pizza pizza = null;
   PizzaIngredientFactory ingredientFactory = new NYPizzaIngredientFactory();
   
   if(item.equals("cheese");{
      pizza = new CheesePizza();
      pizza.setName("New York Style Cheese Pizza");
   } else{
      System.out.println("Error");
   }
   
   return pizza;
}