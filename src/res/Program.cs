using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Noria.FireEmblem.Resource
{
    class Program
    {
        static void Main(string[] args)
        {
            var path = args[0];
            var manifest = args[1];
            var artifact = args[2];

            var res = JToken.Parse(File.ReadAllText(manifest));
            res["date"] = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

            var files = Directory.GetFiles(path, "*", SearchOption.AllDirectories);
            res["files"] = files.Length;
            res["content"] = new JObject();

            var offset = 0;
            using (var bs = new BinaryWriter(File.OpenWrite(artifact)))
            {
                foreach (var file in files)
                {
                    var buff = File.ReadAllBytes(file);
                    bs.Write(buff);

                    ProcessManifest(res, path, file, offset, buff.Length);

                    offset += buff.Length;
                }
            }

            File.WriteAllText(manifest, res.ToString());

            Console.WriteLine("done.");
        }

        private static void ProcessManifest(JToken res, string path, string file, int offset, int size)
        {
            var token = file.Substring(path.Length + 1);
            var tokens = token.Split('\\');
            var name = tokens.Last();

          
            JToken leaf = res["content"];

            foreach (var ns in tokens.Take(tokens.Length - 1))
            {
                if (leaf[ns] == null)
                {
                    leaf[ns] = new JObject();
                }
                leaf = leaf[ns];
            }

            leaf[name] = new JArray(new[] { offset, size });
        }
    }
}
