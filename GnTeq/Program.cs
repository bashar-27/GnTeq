using GnTeq.Data;
using GnTeq.Models;
using GnTeq.Models.Interface;
using GnTeq.Models.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Text.Json.Serialization;


namespace GnTeq
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowLocalhost3000",
                    builder => builder.WithOrigins("http://localhost:3000") // Replace with your Next.js app's URL
                                     .AllowAnyHeader()
                                     .AllowAnyMethod());
            });

            builder.Services.AddControllers().AddNewtonsoftJson(options =>
            options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
   );
            builder.Services.AddControllers()
           .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            string? connString = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<GnTeqDbContext>
               (options => options.UseSqlServer(connString));
            builder.Services.AddIdentity<AppUser, IdentityRole>
              (options =>
              {
                  options.User.RequireUniqueEmail = true;
              }).AddEntityFrameworkStores<GnTeqDbContext>();


           // builder.Services.AddEndpointsApiExplorer();

            builder.Services.AddTransient<IAdmin, IdentityAdminService>();
            builder.Services.AddTransient<IEmployee,EmployeeService>();
            builder.Services.AddScoped<JWTTokenService>();

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {

                options.TokenValidationParameters = JWTTokenService.GetValidationPerameters(builder.Configuration);
            });


            builder.Services.AddAuthorization(options => {
                options.AddPolicy("create", policy => policy.RequireClaim("persmissions", "create"));
                options.AddPolicy("update", policy => policy.RequireClaim("persmissions", "update"));
                options.AddPolicy("delete", policy => policy.RequireClaim("persmissions", "delete"));
                options.AddPolicy("read", policy => policy.RequireClaim("persmissions", "read"));
            });
            builder.Services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo()
                {
                    Title = "GN Teq",
                    Version = "v1",
                });
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "add the JWT TOKEN"
                });
                options.AddSecurityRequirement(new OpenApiSecurityRequirement
     {{
         new OpenApiSecurityScheme {
         Reference=
         new OpenApiReference{
             Type=ReferenceType.SecurityScheme,
             Id= "Bearer"
     }
     },
     new string[]{ } }
     });
            });

   
            var app = builder.Build();

          app.UseCors(options=>options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseRouting();
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseSwagger(options =>
            {
                options.RouteTemplate = "/swagger/{documentName}/swagger.json";
            });

            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "GN Teq");
                options.RoutePrefix = "swagger";
            });

            app.MapControllers();

            app.Run();
        }
    }
}
