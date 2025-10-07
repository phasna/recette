#!/usr/bin/env node

/**
 * Script de démarrage de l'application
 * Gère les conflits de ports et démarre les services
 */

const { exec, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Démarrage de l\'application de gestion des recettes\n');

/**
 * Vérifier si un port est utilisé
 */
function isPortInUse(port) {
  return new Promise((resolve) => {
    exec(`lsof -ti:${port}`, (error, stdout) => {
      if (error) {
        resolve(false);
      } else {
        resolve(stdout.trim() !== '');
      }
    });
  });
}

/**
 * Tuer les processus sur un port
 */
function killPort(port) {
  return new Promise((resolve) => {
    exec(`lsof -ti:${port}`, (error, stdout) => {
      if (error || !stdout.trim()) {
        resolve();
        return;
      }
      
      const pids = stdout.trim().split('\n');
      pids.forEach(pid => {
        exec(`kill -9 ${pid}`, () => {});
      });
      
      setTimeout(resolve, 1000);
    });
  });
}

/**
 * Démarrer le backend
 */
async function startBackend() {
  console.log('🔧 Démarrage du backend...');
  
  const backendPath = path.join(__dirname, 'backend');
  
  return new Promise((resolve) => {
    const backend = spawn('node', ['server.js'], {
      cwd: backendPath,
      stdio: 'pipe'
    });
    
    backend.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Serveur démarré')) {
        console.log('✅ Backend démarré sur le port 3000');
        resolve(backend);
      }
    });
    
    backend.stderr.on('data', (data) => {
      console.log('Backend:', data.toString());
    });
    
    backend.on('error', (error) => {
      console.log('❌ Erreur backend:', error.message);
      resolve(null);
    });
  });
}

/**
 * Démarrer le frontend
 */
async function startFrontend() {
  console.log('🎨 Démarrage du frontend...');
  
  const frontendPath = path.join(__dirname, 'frontend');
  
  return new Promise((resolve) => {
    const frontend = spawn('npm', ['start'], {
      cwd: frontendPath,
      stdio: 'pipe'
    });
    
    frontend.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Local:')) {
        console.log('✅ Frontend démarré sur le port 3000');
        resolve(frontend);
      }
    });
    
    frontend.stderr.on('data', (data) => {
      console.log('Frontend:', data.toString());
    });
    
    frontend.on('error', (error) => {
      console.log('❌ Erreur frontend:', error.message);
      resolve(null);
    });
  });
}

/**
 * Démarrer l'application complète
 */
async function startApplication() {
  try {
    // Vérifier les ports
    console.log('🔍 Vérification des ports...');
    
    const port3000InUse = await isPortInUse(3000);
    if (port3000InUse) {
      console.log('⚠️ Port 3000 déjà utilisé, libération...');
      await killPort(3000);
    }
    
    // Démarrer le backend
    const backend = await startBackend();
    if (!backend) {
      console.log('❌ Impossible de démarrer le backend');
      return;
    }
    
    // Attendre que le backend soit prêt
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Démarrer le frontend
    const frontend = await startFrontend();
    if (!frontend) {
      console.log('❌ Impossible de démarrer le frontend');
      return;
    }
    
    console.log('\n🎉 Application démarrée avec succès !');
    console.log('📱 Frontend: http://localhost:3000');
    console.log('🔧 Backend: http://localhost:3000/api');
    console.log('\n💡 Pour arrêter l\'application, appuyez sur Ctrl+C');
    
    // Gérer l'arrêt propre
    process.on('SIGINT', () => {
      console.log('\n🛑 Arrêt de l\'application...');
      if (backend) backend.kill();
      if (frontend) frontend.kill();
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Erreur lors du démarrage:', error.message);
  }
}

// Démarrer l'application
startApplication();
