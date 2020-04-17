public class PizzaStore{
   
   SimplePizzaFactory factory;
   
   public Pizzastore(SimplePizzaFactory factory){
      this.factory = factory;
   }
   
   public Pizza orderPizza(String type){
      Pizza pizza;
      
      pizza = factory.createPizza(type);
      pizza.prepare();
      pizza.bake();
      pizza.cut();
      pizza.box();
      
      return pizza;
   }
}