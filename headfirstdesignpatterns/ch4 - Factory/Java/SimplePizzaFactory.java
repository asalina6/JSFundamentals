public class SimplePizzaFactory{
   
   public Pizza createPizza(String type){ 
      Pizza pizza = null;
      
      if(type.equals("cheese")){
         pizza = new CheesePizza();
      } else if (type.equals("Pepporoni")){
         pizza = new PepporoniPizza();
      } else if (type.equals("Clam")){
         pizza = new ClamPizza();
      } else if (type.equals("Veggie")){
         pizza = new VeggiePizza();
      } 
      
      return pizza;
 } 