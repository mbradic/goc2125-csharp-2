namespace GeometryDemo {
    internal class Program {

        static Circle small = new Circle(5); // statické pole
        static Circle large = new Circle(25); // statické pole
        
        static void Main(string[] args) {
            PrintCircles();
            Circle.PI = 4;
            Console.WriteLine();
            PrintCircles();
        }

        static void PrintCircles() { // statická metoda
            Console.WriteLine($"Hodnota PI je {Circle.PI}");
            Console.WriteLine(small);
            Console.WriteLine(large);
        }
    }
}
