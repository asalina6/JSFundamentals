public class Mocha extends CondimentDecorator{
   Beverage beverage;
   
   public Mocha(Beverage beverage){
      this.beverage = beverage;
   }
   
   public String getDescription(){
      return beverage.getDescription() + ", Mocha";
   }
   
   public double cost(){
   
      double cost = beverage.cost();
   
      if(beverage.getSize() == Size.TALL){
         cost += .2;
      } else if(beverage.getSize() == Size.GRANDE){  
         cost += .25;
      } else if(beverage.getSize() == Size.VENTI){
         cost += 0.30;
      }
   
      return cost;

   }
}
