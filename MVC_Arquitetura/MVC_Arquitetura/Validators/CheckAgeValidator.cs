using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MVC_Arquitetura.Validators
{
    public class CheckAgeValidator : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            DateTime date = (DateTime)value;

            if ((date.Year - 18) > 0)
                return new ValidationResult("Somente para maiores");

            return ValidationResult.Success;
        }
    }
}