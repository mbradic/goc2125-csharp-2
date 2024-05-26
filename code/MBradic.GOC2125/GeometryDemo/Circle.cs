namespace GeometryDemo {
    class Circle {

        public static double PI = 3.14; // statické pole

        private double _radius;

        public Circle(double radius) {
            _radius = radius;
        }

        public double Radius {
            get { return _radius; }
        }

        public double Area {
            get {
                return PI * _radius * _radius;
            }
        }

        public override string ToString() {
            return $"(Kruh) Poloměr: {Radius}, Obsah: {Area}";
        }
    }
}
