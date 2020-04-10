public abstract class CondimentDecorator extends Beverage{

   public Beverage beverage; //added this when I added size
   
   public abstract String getDescription();
   
   public Size getSize(){    //added this when I added size
      return beverage.getSize();
   }
}