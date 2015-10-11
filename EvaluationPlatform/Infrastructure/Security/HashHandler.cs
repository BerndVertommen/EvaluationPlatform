using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Security
{
    public static class HashHandler
    {
        private static readonly System.Security.Cryptography.HashAlgorithm sha1 = SHA1.Create();
        public static string Hash(string value, out string salt)
        {
            salt = null;
            if (value == null) return null;

            using (var deriveBytes = new Rfc2898DeriveBytes(value, 20))
            {
                salt = Convert.ToBase64String(deriveBytes.Salt);
                var key = deriveBytes.GetBytes(20);

                return Convert.ToBase64String(key);
            }
        }

        public static string Hash(string value, string salt)
        {
            if (value == null) return null;

            using (var deriveBytes = new Rfc2898DeriveBytes(value, Convert.FromBase64String(salt)))
            {
                var key = deriveBytes.GetBytes(20);
                return Convert.ToBase64String(key);
            }
        }
    }
}
