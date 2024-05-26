namespace GeometryDemo {
    internal class Program {

        static Circle small = new Circle(5);
        static Circle large = new Circle(25);
        
        static void Main(string[] args) {
            PrintCircles();
            Circle.PI = 4;
            Console.WriteLine();
            PrintCircles();
        }

        static void PrintCircles() {
            Console.WriteLine($"Hodnota PI je {Circle.PI}");
            Console.WriteLine(small);
            Console.WriteLine(large);
        }
    }
}
