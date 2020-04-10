public interface Observer{
   public void update(float temperature, float humidity, float pressure); //This might haunt us in the future if we need to add more measurements
}