public class Whip extends CondimentDecorator{
   
   Beverage beverage;
   
   public Whip(Beverage beverage){
      this.beverage = beverage;
   }
   
   public String getDescription(){
      return beverage.getDescription() + ", Whip";
   }
   
   public double cost(){
         double cost = beverage.cost();
   
      if(beverage.getSize() == Size.TALL){
         cost += .10;
      } else if(beverage.getSize() == Size.GRANDE){  
         cost += .15;
      } else if(beverage.getSize() == Size.VENTI){
         cost += 0.20;
      } else{
         System.out.println("Error in size in cost function");
      }
   
      return cost;

   }
}