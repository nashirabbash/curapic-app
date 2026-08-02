import os
import glob
import re
import shutil
import urllib.parse

def main():
    docs_dir = "/home/broo/Documents/Porto/Curapic/docs"
    md_files = glob.glob(os.path.join(docs_dir, "*.md"))
    
    count = 0
    for file_path in md_files:
        # Baca isi file sedikit untuk mencari source_url di frontmatter
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read(1024)  # 1KB pertama cukup untuk frontmatter
            
        match = re.search(r'^source_url:\s*"([^"]+)"', content, re.MULTILINE)
        if not match:
            continue
            
        url = match.group(1)
        
        parsed = urllib.parse.urlparse(url)
        path = parsed.path
        
        prefix = "/versions/latest/sdk/"
        if path.startswith(prefix):
            rel_path = path[len(prefix):]
        else:
            rel_path = path.split('/sdk/')[-1] if '/sdk/' in path else path.strip('/')
            
        rel_path = rel_path.strip('/')
        if not rel_path:
            rel_path = "index"
            
        new_path = os.path.join(docs_dir, f"{rel_path}.md")
        
        if file_path != new_path:
            os.makedirs(os.path.dirname(new_path), exist_ok=True)
            shutil.move(file_path, new_path)
            count += 1
            print(f"Memindahkan: {os.path.basename(file_path)} -> {rel_path}.md")
            
    print(f"\nSelesai! {count} file berhasil ditata ulang.")

if __name__ == "__main__":
    main()
