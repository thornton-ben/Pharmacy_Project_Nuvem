namespace PharmacyProj.Database.Models
{
    public class QueryParameters
    {
        private const int _maxItemsPerPage = 20;
        private int itemsPerPage;

        public int Page { get; set; } = 1;
        public int ItemsPerPage
        {
            get => itemsPerPage;
            set => itemsPerPage = value > _maxItemsPerPage ? _maxItemsPerPage : value;
        }
    }
}
