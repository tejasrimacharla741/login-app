using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JwtApp.Models
{
    public class UserConstants
    {
        public static List<UserModel> Users = new List<UserModel>()
        {
            new UserModel() { Username = "admin", EmailAddress = "admin@email.com", Password = "Test@123", Role = "Admin" },
            new UserModel() { Username = "editor", EmailAddress = "editor@email.com", Password = "Test@123", Role = "Editor" },
            new UserModel() { Username = "viewer", EmailAddress = "viewer@email.com", Password = "Test@123", Role = "Viewer" },
            new UserModel() { Username = "user1", EmailAddress = "user1@email.com", Password = "Test@123", Role = "Public" },
            new UserModel() { Username = "user2", EmailAddress = "user2@email.com", Password = "Test@123", Role = "Public" },
        };
    }
}