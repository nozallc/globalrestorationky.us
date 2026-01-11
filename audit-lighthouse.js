import lighthouse from 'lighthouse';
import * as fs from 'fs';

const urls = [
  { name: 'homepage', url: 'http://localhost:4321/' },
  { name: 'request-inspection', url: 'http://localhost:4321/request-inspection' }
];

const presets = ['desktop', 'mobile'];

async function runAudits() {
  for (const preset of presets) {
    for (const { name, url } of urls) {
      console.log(`\nRunning Lighthouse ${preset} audit on ${name}...`);
      try {
        const options = {
          logLevel: 'info',
          output: 'json',
          onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
          port: 9222,
        };
        
        const runnerResult = await lighthouse(url, options);
        const json = JSON.stringify(runnerResult.lhr, null, 2);
        const filename = `./lighthouse-${preset}-${name}.json`;
        fs.writeFileSync(filename, json);
        
        console.log(`✓ Saved to ${filename}`);
        
        // Print scores
        const { categories } = runnerResult.lhr;
        console.log(`  Performance: ${Math.round(categories.performance.score * 100)}`);
        console.log(`  Accessibility: ${Math.round(categories.accessibility.score * 100)}`);
        console.log(`  Best Practices: ${Math.round(categories['best-practices'].score * 100)}`);
        console.log(`  SEO: ${Math.round(categories.seo.score * 100)}`);
      } catch (err) {
        console.error(`Error running audit on ${name}:`, err.message);
      }
    }
  }
}

runAudits();
