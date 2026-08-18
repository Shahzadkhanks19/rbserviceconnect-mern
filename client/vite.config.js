import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins:[react(),tailwindcss()],
  build:{
    sourcemap:false,
    rolldownOptions:{
      output:{
        codeSplitting:{
          groups:[
            {name:'react-vendor',test:/node_modules[\\/]react(?:-dom)?[\\/]|node_modules[\\/]react-router(?:-dom)?[\\/]/},
            {name:'icons-vendor',test:/node_modules[\\/]lucide-react[\\/]/},
            {name:'realtime-vendor',test:/node_modules[\\/]socket\.io-client[\\/]/},
          ],
        },
      },
    },
  },
  server:{
    port:5173,
    proxy:{
      '/api':{target:'http://localhost:5000',changeOrigin:true},
      '/socket.io':{target:'http://localhost:5000',changeOrigin:true,ws:true},
    },
  },
});
