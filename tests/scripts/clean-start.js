#!/usr/bin/env node

/**
 * Script de nettoyage et démarrage propre
 * Arrête tous les processus et démarre l'application
 */

const { exec, spawn } = require('child_process');

console.log('🧹 Nettoyage des ports et démarrage propre\n');

/**
 * Arrêter tous les processus sur les ports 3000 et 5000
 */
async function cleanPorts() {
  console.log('🔧 Nettoyage des ports...');
  
  const ports = [3000, 5000];
  
  for (const port of ports) {
    try {
      await new Promise((resolve) => {
        exec(`lsof -ti:${port}`, (error, stdout) => {
          if (stdout.trim()) {
            console.log(`🛑 Arrêt des processus sur le port ${port}...`);
            exec(`kill -9 ${stdout.trim()}`, () => {
              console.log(`✅ Port ${port} libéré`);
              resolve();
            });
          } else {
            console.log(`✅ Port ${port} déjà libre`);
            resolve();
          }
        });
      });
    } catch (error) {
      console.log(`⚠️ Erreur port ${port}:`, error.message);
    }
  }
}

/**
 * Démarrer le backend
 */
async function startBackend() {
  console.log('\n🚀 Démarrage du backend...');
  
  return new Promise((resolve) => {
    const backend = spawn('node', ['server.js'], {
      cwd: './backend',
      stdio: 'pipe'
    });
    
    let started = false;
    
    backend.stdout.on('data', (data) => {
      const output = data.toString();
      console.log('Backend:', output);
      
      if (output.includes('Serveur démarré') && !started) {
        console.log('✅ Backend démarré sur le port 5000');
        started = true;
        resolve(backend);
      }
    });
    
    backend.stderr.on('data', (data) => {
      console.log('Backend Error:', data.toString());
    });
    
    backend.on('error', (error) => {
      console.log('❌ Erreur backend:', error.message);
      resolve(null);
    });
    
    // Timeout après 5 secondes
    setTimeout(() => {
      if (!started) {
        console.log('⏰ Timeout backend, mais processus démarré');
        resolve(backend);
      }
    }, 5000);
  });
}

/**
 * Démarrer le frontend
 */
async function startFrontend() {
  console.log('\n🎨 Démarrage du frontend...');
  
  return new Promise((resolve) => {
    const frontend = spawn('npm', ['run', 'dev'], {
      cwd: './frontend',
      stdio: 'pipe'
    });
    
    let started = false;
    
    frontend.stdout.on('data', (data) => {
      const output = data.toString();
      console.log('Frontend:', output);
      
      if (output.includes('Local:') && !started) {
        console.log('✅ Frontend démarré sur le port 3000');
        started = true;
        resolve(frontend);
      }
    });
    
    frontend.stderr.on('data', (data) => {
      console.log('Frontend Error:', data.toString());
    });
    
    frontend.on('error', (error) => {
      console.log('❌ Erreur frontend:', error.message);
      resolve(null);
    });
    
    // Timeout après 10 secondes
    setTimeout(() => {
      if (!started) {
        console.log('⏰ Timeout frontend, mais processus démarré');
        resolve(frontend);
      }
    }, 10000);
  });
}

/**
 * Fonction principale
 */
async function main() {
  try {
    // Nettoyer les ports
    await cleanPorts();
    
    // Attendre un peu
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Démarrer le backend
    const backend = await startBackend();
    if (!backend) {
      console.log('❌ Impossible de démarrer le backend');
      return;
    }
    
    // Attendre que le backend soit prêt
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Démarrer le frontend
    const frontend = await startFrontend();
    if (!frontend) {
      console.log('❌ Impossible de démarrer le frontend');
      return;
    }
    
    console.log('\n🎉 Application démarrée avec succès !');
    console.log('📱 Frontend: http://localhost:3000');
    console.log('🔧 Backend: http://localhost:5000/api');
    console.log('\n💡 Pour arrêter, appuyez sur Ctrl+C');
    
    // Gérer l'arrêt propre
    process.on('SIGINT', () => {
      console.log('\n🛑 Arrêt de l\'application...');
      if (backend) backend.kill();
      if (frontend) frontend.kill();
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

// Exécuter
main();
