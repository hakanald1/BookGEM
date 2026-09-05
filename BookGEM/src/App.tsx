import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './components/component/pages/landingPage'
import { Signup } from './components/component/pages/signup'
import { Login } from './components/component/pages/login'
import { Dashboard } from './components/component/pages/dashboard'
import { RecipesPage } from './components/component/pages/recipesPage'
import { RecipeDetailPage } from './components/component/pages/recipeDetailPage'
import { ProtectedRoute } from './components/component/ProtectedRoute'
import { PublicRoute } from './components/component/PublicRoute'
import { AuthPageSkeleton } from './components/component/auth/AuthSkeleton'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          } 
        />
        <Route 
          path="/signup/*" 
          element={
            <PublicRoute fallback={<AuthPageSkeleton mode="signup" />}>
              <Signup />
            </PublicRoute>
          } 
        />
        <Route 
          path="/login/*" 
          element={
            <PublicRoute fallback={<AuthPageSkeleton mode="login" />}>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/recipes" 
          element={
            <ProtectedRoute>
              <RecipesPage key="recipes-page" initialTab="all" />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/recipes/:id" 
          element={
            <ProtectedRoute>
              <RecipeDetailPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/saved" 
          element={
            <ProtectedRoute>
              <RecipesPage key="saved-gems-page" initialTab="saved" />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/cookbooks" 
          element={<Navigate to="/dashboard" replace />} 
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
