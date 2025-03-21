using Microsoft.EntityFrameworkCore;
using Mission11_Erickson.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure SQLite database connection
builder.Services.AddDbContext<BookStoreDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("BookstoreConnection")));

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowFrontend",
        configurePolicy: policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                .AllowCredentials()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

//app.UseHttpsRedirection();

app.UseAuthorization();
app.MapControllers();
app.Run();
