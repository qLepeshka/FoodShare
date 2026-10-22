# FoodShare — .NET Backend Architecture

## Обзор

Бэкенд FoodShare построен на ASP.NET Core Web API с использованием следующих технологий:
- .NET 8
- Entity Framework Core
- SQL Server / PostgreSQL
- JWT Authentication
- AutoMapper
- FluentValidation

## Структура проекта

```
FoodShare.API/
├── Controllers/
│   ├── AuthController.cs          # Регистрация, логин, JWT
│   ├── RecipesController.cs       # CRUD рецептов
│   ├── UsersController.cs         # Профили, подписки
│   ├── MealPlansController.cs     # Планировщик меню
│   ├── ShoppingListController.cs  # Список покупок
│   └── CommentsController.cs      # Комментарии
├── Models/
│   ├── Entities/
│   │   ├── User.cs
│   │   ├── Recipe.cs
│   │   ├── Ingredient.cs
│   │   ├── Comment.cs
│   │   ├── MealPlan.cs
│   │   ├── ShoppingListItem.cs
│   │   └── RecipeLike.cs
│   └── DTOs/
│       ├── RecipeDto.cs
│       ├── CreateRecipeDto.cs
│       ├── UserDto.cs
│       └── CommentDto.cs
├── Services/
│   ├── Interfaces/
│   │   ├── IRecipeService.cs
│   │   ├── IUserService.cs
│   │   └── IAuthService.cs
│   ├── RecipeService.cs
│   ├── UserService.cs
│   └── AuthService.cs
├── Data/
│   ├── AppDbContext.cs
│   └── Migrations/
├── Middleware/
│   └── ExceptionMiddleware.cs
├── Program.cs
├── appsettings.json
└── appsettings.Development.json
```

## API Endpoints

### Authentication
```
POST   /api/auth/register          # Регистрация
POST   /api/auth/login             # Логин
POST   /api/auth/refresh           # Обновление токена
POST   /api/auth/logout            # Выход
```

### Recipes
```
GET    /api/recipes                # Список рецептов (пагинация, фильтры)
GET    /api/recipes/{id}           # Детали рецепта
POST   /api/recipes                # Создать рецепт
PUT    /api/recipes/{id}           # Обновить рецепт
DELETE /api/recipes/{id}           # Удалить рецепт
POST   /api/recipes/{id}/like      # Лайк/анлайк
POST   /api/recipes/{id}/save      # Сохранить/убрать
GET    /api/recipes/search?q=      # Поиск
GET    /api/recipes/popular        # Популярные
GET    /api/recipes/trending       # В тренде
```

### Users
```
GET    /api/users/me               # Текущий пользователь
GET    /api/users/{id}             # Профиль пользователя
PUT    /api/users/me               # Обновить профиль
POST   /api/users/{id}/follow      # Подписаться/отписаться
GET    /api/users/{id}/recipes     # Рецепты пользователя
GET    /api/users/{id}/followers   # Подписчики
GET    /api/users/{id}/following   # Подписки
```

### Meal Plans
```
GET    /api/meal-plans/week        # План на неделю
POST   /api/meal-plans             # Добавить блюдо
DELETE /api/meal-plans/{id}        # Удалить блюдо
```

### Shopping List
```
GET    /api/shopping-list          # Получить список
POST   /api/shopping-list/generate # Сгенерировать из плана
PATCH  /api/shopping-list/{id}     # Отметить купленным
DELETE /api/shopping-list          # Очистить
```

### Comments
```
GET    /api/recipes/{id}/comments  # Комментарии к рецепту
POST   /api/recipes/{id}/comments  # Добавить комментарий
DELETE /api/comments/{id}          # Удалить комментарий
```

## Пример модели Recipe (Entity)

```csharp
public class Recipe
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string ImageUrl { get; set; }
    public int CookTime { get; set; }
    public int PrepTime { get; set; }
    public int Servings { get; set; }
    public int Calories { get; set; }
    public Difficulty Difficulty { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    // Navigation
    public Guid AuthorId { get; set; }
    public User Author { get; set; }
    public ICollection<Ingredient> Ingredients { get; set; }
    public ICollection<RecipeStep> Steps { get; set; }
    public ICollection<RecipeTag> Tags { get; set; }
    public ICollection<Comment> Comments { get; set; }
    public ICollection<RecipeLike> Likes { get; set; }
}

public enum Difficulty
{
    Easy,
    Medium,
    Hard
}
```

## Пример Controller

```csharp
[ApiController]
[Route("api/[controller]")]
public class RecipesController : ControllerBase
{
    private readonly IRecipeService _recipeService;
    
    public RecipesController(IRecipeService recipeService)
    {
        _recipeService = recipeService;
    }
    
    [HttpGet]
    public async Task<ActionResult<PaginatedResult<RecipeDto>>> GetAll(
        [FromQuery] RecipeQueryParams queryParams)
    {
        var result = await _recipeService.GetAllAsync(queryParams);
        return Ok(result);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<RecipeDto>> GetById(Guid id)
    {
        var recipe = await _recipeService.GetByIdAsync(id);
        if (recipe == null) return NotFound();
        return Ok(recipe);
    }
    
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RecipeDto>> Create([FromBody] CreateRecipeDto dto)
    {
        var userId = User.GetUserId();
        var recipe = await _recipeService.CreateAsync(dto, userId);
        return CreatedAtAction(nameof(GetById), new { id = recipe.Id }, recipe);
    }
    
    [Authorize]
    [HttpPost("{id}/like")]
    public async Task<IActionResult> ToggleLike(Guid id)
    {
        var userId = User.GetUserId();
        await _recipeService.ToggleLikeAsync(id, userId);
        return NoContent();
    }
}
```

## Деплой

### Azure (рекомендуется)
```bash
dotnet publish -c Release -o ./publish
az webapp up --name foodshare-api --resource-group foodshare-rg
```

### Docker
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY publish/ .
EXPOSE 8080
ENTRYPOINT ["dotnet", "FoodShare.API.dll"]
```

### Vercel + Azure Functions (гибрид)
Фронтенд на Vercel, API на Azure Functions или Azure App Service.

## Переменные окружения

```env
# Frontend (.env)
VITE_API_URL=https://foodshare-api.azurewebsites.net/api

# Backend (appsettings.json / Azure Key Vault)
ConnectionStrings__DefaultConnection=Server=...;Database=FoodShare;...
Jwt__Key=your-super-secret-key-min-32-chars
Jwt__Issuer=foodshare-api
Jwt__Audience=foodshare-client
AzureStorage__ConnectionString=...
```
