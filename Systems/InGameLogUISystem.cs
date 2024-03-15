using Colossal.Logging;
using Colossal.UI.Binding;
using Game.Prefabs;
using Game.UI;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace Trejak.InGameLogViewer.Systems
{
    internal partial class InGameLogUISystem : UISystemBase
    {

        private ValueBinding<bool> m_LogPanelEnabled;
        private ValueBinding<string[]> m_LogFiles;
        private ValueBinding<string> m_LogFileSelected;
        private ValueBinding<string> m_LogContent;

        private FileSystemWatcher logFolderWatcher;
        private FileSystemWatcher outerFolderWatcher;
        //private FileSystemWatcher fileContentWatcher;

        const string PlayerLog = "Player.log";


        protected override void OnCreate()
        {
            base.OnCreate();

            logFolderWatcher = new FileSystemWatcher(LogManager.kDefaultLogPath, "*.log");
            //logFolderWatcher.NotifyFilter = NotifyFilters.FileName;
            logFolderWatcher.Created += OnLogFileCreated;
            logFolderWatcher.Deleted += OnLogFileDeleted;
            logFolderWatcher.Renamed += OnLogFileRenamed;
            logFolderWatcher.Changed += OnLogFileChanged;
            logFolderWatcher.EnableRaisingEvents = true;

            outerFolderWatcher = new FileSystemWatcher(Application.persistentDataPath, "*.log");
            outerFolderWatcher.Created += OnLogFileCreated;
            outerFolderWatcher.Deleted += OnLogFileDeleted;
            outerFolderWatcher.Renamed += OnLogFileRenamed;
            outerFolderWatcher.Changed += OnLogFileChanged;
            outerFolderWatcher.EnableRaisingEvents = true;



            //fileContentWatcher = new FileSystemWatcher(LogManager.kDefaultLogPath, "");
            ////fileContentWatcher.NotifyFilter = NotifyFilters.LastWrite | NotifyFilters.Size | NotifyFilters.CreationTime | NotifyFilters.Attributes;
            //fileContentWatcher.Changed += OnLogFileChanged;
            //fileContentWatcher.Created += OnLogFileCreated;
            //fileContentWatcher.Deleted += OnLogFileDeleted;
            //fileContentWatcher.Renamed += OnLogFileRenamed;
            //fileContentWatcher.EnableRaisingEvents = true;

            AddBinding(m_LogPanelEnabled = new ValueBinding<bool>("Trejak.InGameLogViewer", "LogPanelEnabled", true));
            AddBinding(m_LogFiles = new ValueBinding<string[]>("Trejak.InGameLogViewer", "LogFiles", GetLogFileNames(), new ArrayWriter<string>()));
            AddBinding(m_LogFileSelected = new ValueBinding<string>("Trejak.InGameLogViewer", "LogFileSelected", ""));
            AddBinding(m_LogContent = new ValueBinding<string>("Trejak.InGameLogViewer", "LogContent", ""));

            AddBinding(new TriggerBinding("Trejak.InGameLogViewer", "LogPanelClosed", LogPanelClosed));
            AddBinding(new TriggerBinding("Trejak.InGameLogViewer", "LogPanelToggled", LogPanelToggled));
            AddBinding(new TriggerBinding<string>("Trejak.InGameLogViewer", "OpenLogFile", OpenLogFile));
            Mod.log.Info("InGameLogUISystem created.");
            
        }

        private string[] GetLogFileNames()
        {
            var filePaths = Directory.GetFiles(LogManager.kDefaultLogPath, "*.log", SearchOption.TopDirectoryOnly);
            string[] re = new string[filePaths.Length];
            for(var i = 0; i < re.Length; i++)
            {
                re[i] = Path.GetFileName(filePaths[i]);
            }
            return re;
        }

        private string GetLogFileContent(string fileName)
        {
            var path = Path.Combine(LogManager.kDefaultLogPath, fileName);
            if (fileName == PlayerLog)
            {
                path = Path.Combine(Application.persistentDataPath, fileName);
            }
            string re = File.ReadAllText(path);
            return re;
        }

        private void UpdateLogFileList()
        {
            m_LogFiles.Update(GetLogFileNames());
        }

        private void OnLogFileCreated(object sender, FileSystemEventArgs evt)
        {
            //Mod.log.Info($"File {evt.Name} created: {evt.ChangeType}");
            UpdateLogFileList();
        }

        private void OnLogFileDeleted(object sender, FileSystemEventArgs evt)
        {
            //Mod.log.Info($"File {evt.Name} deleted: {evt.ChangeType}");
            UpdateLogFileList();
            if (evt.Name == m_LogFileSelected.value)
            {
                if (m_LogFiles.value.Length > 0)
                    OpenLogFile(m_LogFiles.value[0]);
            }            
        }

        private void OnLogFileRenamed(object sender, RenamedEventArgs evt)
        {
            //Mod.log.Info($"File {evt.OldName}, moved to {evt.Name} with event {evt.ChangeType}");
            UpdateLogFileList();
            if (evt.OldName == m_LogFileSelected.value)
            {                
                OpenLogFile(evt.Name);
            }
        }

        private void OnLogFileChanged(object sender, FileSystemEventArgs evt)
        {
            // Only for the fileContentWatcher
            //Mod.log.Info($"File {evt.Name} changed with event {evt.ChangeType}");
            if (evt.ChangeType != WatcherChangeTypes.Changed)
            {
                return;
            }
            //Mod.log.Info($"File changed {evt.Name} vs {m_LogFileSelected.value}");
            if (evt.Name == m_LogFileSelected.value)
            {
                //Mod.log.Info("File changed");
                UpdateLogFileContent(m_LogFileSelected.value);
            }
        }

        private void UpdateLogFileContent(string logFile)
        {
            string content = GetLogFileContent(logFile);
            m_LogContent.Update(content);
        }

        private void OpenLogFile(string logFile)
        {            
            m_LogFileSelected.Update(logFile);
            //fileContentWatcher.Filter = logFile;            
            UpdateLogFileContent(logFile);
        }

        private void LogPanelClosed()
        {
            m_LogPanelEnabled.Update(false);
        }

        private void LogPanelToggled()
        {
            m_LogPanelEnabled.Update(!m_LogPanelEnabled.value);
        }

        protected override void OnStopRunning()
        {
            base.OnStopRunning();
            logFolderWatcher.EnableRaisingEvents = false;
            outerFolderWatcher.EnableRaisingEvents = false;
            //fileContentWatcher.EnableRaisingEvents = false;
        }

        protected override void OnStartRunning()
        {
            base.OnStopRunning();
            logFolderWatcher.EnableRaisingEvents = true;
            outerFolderWatcher.EnableRaisingEvents = true;
            //fileContentWatcher.EnableRaisingEvents = true;
        }

        protected override void OnDestroy()
        {
            base.OnDestroy();
            logFolderWatcher.Dispose();
            outerFolderWatcher.Dispose();
            //fileContentWatcher.Dispose();
        }

    }
}
