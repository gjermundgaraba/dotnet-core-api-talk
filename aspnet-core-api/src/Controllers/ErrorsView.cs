using System.Collections.Generic;

namespace WebAPIApplication.Controllers
{
    public class ErrorsView
    {
        private List<ErrorView> _listOfErrors;

        public void addError(ErrorView errorView) {
            _listOfErrors.Add(errorView);
        }
    }

    public class ErrorView
    {
        public string error_msg { get; set; }

    }
}